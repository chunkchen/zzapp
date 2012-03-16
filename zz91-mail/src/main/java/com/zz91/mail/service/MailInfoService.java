/**
 * Project name: zz91-mail
 * File name: MailInfoService.java
 * Copyright: 2005-2011 ASTO Info TechCo.,Ltd. All rights reserved
 */
package com.zz91.mail.service;

import java.util.List;
import java.util.Map;

import com.zz91.mail.domain.MailInfoDomain;

/**
 * @author kongsj
 * @email kongsj@zz91.net
 * @date 2011-11-10
 */
public interface MailInfoService {
	
	public final static int SEND_SUCCESS=1;
	public final static int SEND_FAILURE=2;
	public final static int SEND_SENDING=3;
	public final static int SEND_EMAIL_ERROR=4;
	public final static int SEND_WAITING=0;
	
	
	public MailInfoDomain selectById(Integer id);

	public Integer insert(MailInfoDomain mto);

	public Integer update(MailInfoDomain mto);

	public Integer deleteById(Integer id);

	public List<MailInfoDomain> selectMailQueue(Map<String, Object> map);

	public List<MailInfoDomain> queryMailForSend(Integer i);

	public Integer updateSending(Integer id);

	public Integer updateComplete(Integer id, Integer sendStatus);
	
	/**
	 * 系统被强制关闭后的故障恢复
	 */
	public boolean shutdownRecovery(Integer fromStatus, Integer toStatus);
}