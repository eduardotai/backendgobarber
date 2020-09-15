export default interface IStrorageProvider {
    saveFile(file: string): Promise<string>
    deleteFile(file: string): Promise<void>
}