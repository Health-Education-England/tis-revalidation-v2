import { RemoveWhitespacePipe } from "./remove-whitespace.pipe";

fdescribe("RemoveWhitespacePipe", () => {
  it("create an instance", () => {
    const pipe = new RemoveWhitespacePipe();
    expect(pipe).toBeTruthy();
  });
  it("should remove white spaces from text", () => {
    const pipe = new RemoveWhitespacePipe();
    const text = pipe.transform("Lots Of Spaces    ");
    expect(text).toEqual("LotsOfSpaces");
  });
});
