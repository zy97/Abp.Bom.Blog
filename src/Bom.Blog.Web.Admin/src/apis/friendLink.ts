import axios from 'axios';
import { AddFriendLinkDto, FriendLinkDto } from '../data/models/FriendLink';
import { PagedList } from '../data/models/PagedList';
import PageRequest from '../data/models/PageRequest';

// 添加博客
export const addFriendLink = (FriendLink: AddFriendLinkDto) =>
    axios.post<FriendLinkDto>(`/api/app/admin-Friend-Link`, { ...FriendLink });

// 获取博客
export const getFriendLinks = (params: PageRequest) =>
    axios.get<PagedList<FriendLinkDto>>(`/api/app/admin-Friend-Link`, { params });

// 删除博客
export const deleteFriendLink = (id: string) =>
    axios.delete(`/api/app/admin-Friend-Link/${id}`);

// 获取指定博客
export const getFriendLinkById = (id: string) =>
    axios.get<FriendLinkDto>(`/api/app/admin-Friend-Link/${id}`, {});

// 更新博客
export const updateFriendLink = (id: string, FriendLink: AddFriendLinkDto) =>
    axios.put<FriendLinkDto>(`/api/app/admin-Friend-Link/${id}`, {
        ...FriendLink,
    });
