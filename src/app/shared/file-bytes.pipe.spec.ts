import { FileBytesPipe } from "./file-bytes.pipe";

describe("FileBytesPipe", () => {
  it("create an instance", () => {
    const pipe = new FileBytesPipe();
    expect(pipe).toBeTruthy();
  });

  it("it should return bytes, kb, mb, gb", () => {
    const pipe = new FileBytesPipe();
    const filesize = pipe.transform(512);
    const fileKBsize = pipe.transform(1024);
    const fileMBsize = pipe.transform(1048576);
    const fileGBsize = pipe.transform(1073741824);

    expect(filesize).toBe("512 Bytes");
    expect(fileKBsize).toBe("1 KB");
    expect(fileMBsize).toBe("1 MB");
    expect(fileGBsize).toBe("1 GB");
  });

  it("it should return fractions of bytes, kb, mb, gb", () => {
    const pipe = new FileBytesPipe();
    const filesize = pipe.transform(768);
    const fileKBsize = pipe.transform(1537);
    const fileMBsize = pipe.transform(1310720);
    const fileGBsize = pipe.transform(2866890670.08);
    const file3decimals = pipe.transform(3660.8, 3);

    expect(filesize).toBe("768 Bytes");
    expect(fileKBsize).toBe("1.5 KB");
    expect(fileMBsize).toBe("1.25 MB");
    expect(fileGBsize).toBe("2.67 GB");
    expect(file3decimals).toBe("3.575 KB");
  });
});
