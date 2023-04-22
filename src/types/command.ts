export type Command = {
  data: {
    name: string
  },
  execute: () => Promise<void>
}

export type FileCommand = {
  command: Command
}
