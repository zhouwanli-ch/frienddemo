//引入reuest请求
import {
  request
} from './request';

export const getopenid = params => request('getopenid', 'POST', params);
export const getusertable = params => request('getusertable', 'POST', params);
export const getusercardimages = params => request('getusercardimages', 'POST', params);
export const changestate = params => request('changestate', 'POST', params);
export const editinfo = params => request('editinfo', 'POST', params);
export const updatehallTime = params => request('updatehallTime', 'POST', params);
export const newbacktime = params => request('backtime', 'POST', params);
export const newgetallusertable = params => request('newgetallusertable', 'POST', params);
export const getSeelog = params => request('getSeelog', 'POST', params);
export const openidgetusertable = params => request('openidgetusertable', 'POST', params);

export const setusertable = params => request('setusertable', 'POST', params);
export const deletecardimages = params => request('deletecardimages', 'POST', params);

export const approvegrouplist = params => request('approvegrouplist', 'POST', params);
export const deletegroup = params => request('deletegroup', 'POST', params);
export const creategroup = params => request('creategroup', 'POST', params);
export const getgrouplist = params => request('getgrouplist', 'POST', params);
export const getgrouplistall = params => request('getgrouplistall', 'POST', params);
export const getgrouphistorylist = params => request('getgrouphistorylist', 'POST', params);
export const getgrouppersonlist = params => request('getgrouppersonlist', 'POST', params);
export const uploadgroupqrcode = params => request('uploadgroupqrcode', 'POST', params);
