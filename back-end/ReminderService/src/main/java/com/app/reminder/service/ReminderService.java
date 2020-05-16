package com.app.reminder.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.app.reminder.model.Reminder;

@Service
public class ReminderService {
	
	private static List<Reminder> reminders = new ArrayList<Reminder>();
	private static int idCounter = 0;
	
	static {
		reminders.add(new Reminder(++idCounter, "someone", "complete portfolio", new Date(), false));
		reminders.add(new Reminder(++idCounter, "someone", "learn React", new Date(), false));
		reminders.add(new Reminder(++idCounter, "someone", "travel world", new Date(), false));
	}
	
	public List<Reminder> findAll(){
		return reminders;
	}
	
	public Reminder save(Reminder reminder) {
		reminder.setId(++idCounter);
		if(reminder.getId()==-1) {
			reminders.add(reminder);
		} else {
			deleteById(reminder.getId());
			reminders.add(reminder);
		}
		return reminder;
	}
	
	public Reminder deleteById(long id) {
		Reminder reminder = findById(id);
		if(reminder == null) return null;
		if(reminders.remove(reminder))
			return reminder;
		return null;
	}

	public Reminder findById(long id) {
		for(Reminder each:reminders) {
			if(each.getId()==id) {
				return each;
			}
		}
		return null;
	}

}
