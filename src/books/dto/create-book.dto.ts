export class CreateBookDto {
    readonly name: string
    readonly author: string
    readonly category: Array<string>
    readonly score: number
}
