package com.gzhh.hrp.common.service;

import java.util.Date;

import com.gzhh.hrp.tools.ResultView;

public interface AccountStatusService {
	/**
	 * ����Ƿ���Ҫǿ�ƹ���
	 * @param yearMonth		Ҫ���˵��·�
	 * @return				ResultView������Ҫǿ�ƹ��˵��û�������
	 */
	ResultView checkAccountStatus(Date yearMonth);
	
	/**
	 * �Ƿ��ѹ���
	 * @param yearMonth		����
	 * @return				��Ŀ״̬
	 */
	boolean isAccountClose(Date yearMonth);
	
	/**
	 * ����ĳ�·���Ŀ��״̬
	 * @param yearMonth		����
	 * @param status		״̬
	 * @return
	 */
	ResultView updateAccountStatus(Date yearMonth, Boolean status);

	/**
	 *  ����
	 * @param yearMonth		����
	 * @param password		�û�����
	 * @return
	 */
	ResultView openAccount(Date yearMonth, String password);

}
