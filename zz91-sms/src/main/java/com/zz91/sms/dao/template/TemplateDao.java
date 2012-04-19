package com.zz91.sms.dao.template;

import java.util.List;

import com.zz91.sms.domain.Template;

public interface TemplateDao {
	
	public Integer insert(Template template);
	
	public Integer update(Template template);
	
	public Integer delete(Integer id);
	
	public List<Template> query();
}