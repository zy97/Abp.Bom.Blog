export default interface AddTag {
    tagName: string;
    displayName: string;
}
export default interface Tag extends AddTag {
    id: string;
}
