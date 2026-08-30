import path from "path"
import { FilePath } from "./path"
import { globby } from "globby"

export function toPosixPath(fp: string): string {
  return fp.split(path.sep).join("/")
}

export async function glob(
  pattern: string,
  cwd: string,
  ignorePatterns: string[],
): Promise<FilePath[]> {
  const fps = (
    await globby(pattern, {
      cwd,
      ignore: ignorePatterns,
      gitignore: false, // .gitignore 등록 파일(test폴더 등)도 로컬 빌드에 포함되도록 끔 (GitHub 업로드는 git이 계속 차단)
    })
  ).map(toPosixPath)
  return fps as FilePath[]
}
