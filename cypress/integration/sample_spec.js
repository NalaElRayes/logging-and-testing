//Första steget vad är det för förlopp du vill göra exempel Besöka sidan-trycka på en knapp-sedan söka.
//Att välja knappar i cypress är lite mekkigt då cypress bygger på gamla språk såsom xml och jquery
// I cypress kollar man mer funktionerna och inte

//Man vill kolla om något förväntas telexempel om error inte är iklickad så ska inte det finnas några rader.
//data-test-table-row kan man skriva istället för id på componenterna.
//Kan man gå in och kolla på traversy dom i dev tools

//Testerna för volvo ska göras i unit tester, ett plus är att man ska kunna få tillbaka json filen.
//som plus kan man använda redux i applikationen för jobtesterna.

describe("My First Test", () => {
  it("Visit my page", () => {
    cy.visit("http://localhost:3000/");
  });
  it("Does not do much!", () => {
    expect(true).to.equal(true);
  });
  it("Does not do much!", () => {
    expect(true).to.equal(false);
  });
});
