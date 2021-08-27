import { generateHTMLEmail } from "../src/generate-html-email";
import {
  testHtmlTemplate,
  testHandlebarTemplate
} from "../__fixtures__/test-templates";

interface TestParams {
    name: string;
    message: string;
    phone: string;
    email: string;
}

describe("generate-html-email", () => {
  test("Can transpile an email template", async () => {
    const template = await generateHTMLEmail<TestParams>(testHtmlTemplate, {
      name: "Joe Blogs",
      message: "test",
      phone: "0123456789",
      email: "test@gravitywell.co.uk"
    });

    expect(template.replace(/\s/g, "")).toBe(`<div>
        <div width="600px" background-color="#FFF">
        <section background-color="#F5F2F7" padding="25px 35px" border-radius="5px">
            <div>
            <p class="heading">New message from Maya.</p>
            <p class="text">You have a new message from Joe Blogs:</p>
            <p class="text">test</p>
            <p class="text"></p>
            <p class="text">Email: test@gravitywell.co.uk</p>
            <p class="text">Phone: 0123456789</p>
            </div>
        </section>
        </div>
    </div>`.replace(/\s/g, ""));
  });

  test("Fails to transpile an email template when parameter is missing", () => {
    expect(() => {
      generateHTMLEmail<Omit<TestParams, "email">>(testHtmlTemplate, {
        name: "Joe Blogs",
        message: "test",
        phone: "0123456789"
      });
    }).toThrow("{%email%} is required");
  });

  test("Check it does not replace normal {handlebar} values", () => {
    const result = generateHTMLEmail<TestParams>(testHandlebarTemplate, {
      name: "Joe Blogs",
      message: "test",
      phone: "0123456789",
      email: "test@gravitywell.co.uk"
    });

    expect(result).toContain("{email}");
  });
});
