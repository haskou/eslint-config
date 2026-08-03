import { Linter } from "eslint";
import assert from "node:assert/strict";
import test from "node:test";

import { createHaskouConfig } from "../base.mjs";

const typescriptConfig = createHaskouConfig().find(
  (config) => config.name === "haskou/typescript",
);
const memberOrdering =
  typescriptConfig.rules["@typescript-eslint/member-ordering"];

function lintMemberOrder(code) {
  const linter = new Linter();

  return linter.verify(code, {
    languageOptions: {
      parser: typescriptConfig.languageOptions.parser,
    },
    plugins: {
      "@typescript-eslint": typescriptConfig.plugins["@typescript-eslint"],
    },
    rules: {
      "@typescript-eslint/member-ordering": memberOrdering,
    },
  });
}

test("orders field scopes before accessibility", () => {
  const messages = lintMemberOrder(`
    class Example {
      static #privateDefault = 1;
      private static privateDefault = 1;
      protected static protectedDefault = 1;
      public static publicDefault = 1;
      #privateValue = Example.publicDefault;
      private privateValue = Example.publicDefault;
      protected protectedValue = Example.publicDefault;
      public publicValue = Example.publicDefault;
    }
  `);

  assert.deepEqual(messages, []);
});

test("orders methods from private to protected to public", () => {
  const messages = lintMemberOrder(`
    class Example {
      static #privateStaticMethod() {}
      private static privateStaticMethod() {}
      protected static protectedStaticMethod() {}
      public static publicStaticMethod() {}
      #privateMethod() {}
      private privateMethod() {}
      protected protectedMethod() {}
      public publicMethod() {}
    }
  `);

  assert.deepEqual(messages, []);
});

test("still requires static fields before instance fields", () => {
  const messages = lintMemberOrder(`
    class Example {
      protected value = 1;
      public static readonly DEFAULT_VALUE = 1;
    }
  `);

  assert.equal(messages.length, 1);
  assert.equal(messages[0].ruleId, "@typescript-eslint/member-ordering");
});

const invalidAccessibilityOrders = [
  {
    code: `
      class Example {
        public static publicValue = 1;
        protected static protectedValue = 1;
      }
    `,
    name: "protected static fields after public static fields",
  },
  {
    code: `
      class Example {
        protected protectedValue = 1;
        private privateValue = 1;
      }
    `,
    name: "private instance fields after protected instance fields",
  },
  {
    code: `
      class Example {
        public publicMethod() {}
        protected protectedMethod() {}
      }
    `,
    name: "protected methods after public methods",
  },
];

for (const { code, name } of invalidAccessibilityOrders) {
  test(`rejects ${name}`, () => {
    const messages = lintMemberOrder(code);

    assert.ok(
      messages.some(
        (message) => message.ruleId === "@typescript-eslint/member-ordering",
      ),
    );
  });
}
