export interface AddFriendLinkDto {
    title: string;
    linkUrl: string;
}
export interface FriendLinkDto extends AddFriendLinkDto {
    id: string;
}
