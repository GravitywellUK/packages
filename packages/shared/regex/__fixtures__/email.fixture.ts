export const emailFixtures = {
  globalEmail: {
    valid: {
      standard: "joe@example.com",
      standardWithDot: "joe.bloggs@example.com",
      standardWithPlus: "joe+bloggs@example.com",
      standardWithDotPlus: "joe.bloggs+admin@example.com",
      standardWithDotPlusNumbers: "joe534.bloggs232+admin056@example.com",
      irish: "john.o'brian@example.com",
      withDomainHypen: "john.o'brian@exa-mple.com",
      withDomainIp: "john.o'brian@[192.168.2.4]",
      withShortDomain: "joe@example.c"
    },
    invalid: {
      withUserDotFirst: ".bloggs@example.com",
      withUserDotLast: "bloggs.@example.com",
      withUserSpace: "joe bloggs@example.com",
      withNoDomain: "joe@example",
      withDomainHypenFirst: "john.o'brian@-example.com",
      withDomainHypenLast: "john.o'brian@example-.com",
      withNoUser: "@example.com",
      withSymbol: "copywrite(c)-2000@example.com",
      withHashTag: "john#0brian@example.com",
      withDomainIp: "john.o'brian@192.168.2.4",
      withComments: "(comment)xyz@example.com",
      withSpaceBetweenQuotes: "” “@example.com"
    }
  }
};