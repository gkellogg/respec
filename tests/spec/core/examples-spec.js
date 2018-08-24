"use strict";
describe("Core — Examples", () => {
  afterAll(flushIframes);
  it("processes examples", async () => {
    const ops = {
      config: makeBasicConfig(),
      body:
        makeDefaultBody() +
        `<section>
          <pre class='example' title='EX'>\n  {\n    CONTENT\n  }\n  </pre>
        </section>`,
    };
    const doc = await makeRSDoc(ops);
    const example = doc.querySelector("div.example pre");
    const div = example.closest("div");
    expect(div.classList.contains("example")).toBeTruthy();
    expect(div.id).toBe("ex-1-ex");

    const markers = div.querySelectorAll("div.marker");
    expect(markers.length).toBe(1);

    const marker = markers[0];
    expect(marker.textContent).toBe("Example 1: EX");
    expect(marker.querySelector(".example-title").textContent).toBe(
      ": EX"
    );
    expect(example.getAttribute("title")).toBeNull();
    expect(example.textContent).toBe("{\n  CONTENT\n}");
  });

  it("processes aside examples", async () => {
    const ops = {
      config: makeBasicConfig(),
      body:
        makeDefaultBody() +
        `<article>
           <aside class='example' title='EX'>\n{\n  CONTENT\n}\n  </aside>
         </article>`,
    };
    const doc = await makeRSDoc(ops);
    const example = doc.querySelector("aside.example");
    expect(example.id).toBe("ex-1-ex");

    const markers = example.querySelectorAll("div.marker");
    expect(markers.length).toBe(1);

    const [marker] = markers;
    expect(marker.textContent).toBe("Example 1: EX");
    expect(marker.querySelector(".example-title").textContent).toBe(": EX");
    expect(example.getAttribute("title")).toBeNull();
    expect(example.textContent).toBe("Example 1: EX\n{\n  CONTENT\n}\n  ");
  });
});
