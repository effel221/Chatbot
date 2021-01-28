module.exports = {
    roots: ["<rootDir>/src"],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "scss"],
    moduleNameMapper: {
      "\\.(css|less|scss)$": "<rootDir>/src/__tests__/styleMock.js"
    }
};
