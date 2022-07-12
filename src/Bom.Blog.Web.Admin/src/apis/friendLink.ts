import axios from 'axios';
import { AddFriendLink, FriendLink } from '../data/models/FriendLink';
import PagedList from '../data/models/PagedList';
import PageRequest from '../data/models/PageRequest';

// 添加博客
export const addFriendLink = (FriendLink: AddFriendLink) =>
    axios.post<FriendLink>(`/api/app/admin-Friend-Link`, { ...FriendLink });

// 获取博客
export const getFriendLinks = (params: PageRequest) =>
    axios.get<PagedList<FriendLink>>(`/api/app/admin-Friend-Link`, { params });

// 删除博客
export const deleteFriendLink = (id: string) =>
    axios.delete(`/api/app/admin-Friend-Link/${id}`);

// 获取指定博客
export const getFriendLinkById = (id: string) =>
    axios.get<FriendLink>(`/api/app/admin-Friend-Link/${id}`, {});

// 更新博客
export const updateFriendLink = (id: string, FriendLink: AddFriendLink) =>
    axios.put<FriendLink>(`/api/app/admin-Friend-Link/${id}`, {
        ...FriendLink,
    });
