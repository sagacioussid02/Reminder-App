package com.app.reminder.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.app.reminder.model.Hello;
import com.app.reminder.model.Reminder;
import com.app.reminder.service.ReminderService;

@CrossOrigin(origins="*")
@RestController
public class ReminderController {
	
	@Autowired
	private ReminderService reminderService;
	
	@GetMapping(path="/reminder")
	public Hello getWelcomeMessage() {
		return new Hello("Welcome from Service");
	}
	
	
	@GetMapping(path="/reminders/{username}")
	public List<Reminder> getAllReminders(@PathVariable String username) {
		return reminderService.findAll();
	}
	
	@DeleteMapping(path="/reminders/{username}/delete/{id}")
	public ResponseEntity<Void> deleteReminder(@PathVariable String username, @PathVariable long id){
		Reminder reminder = reminderService.deleteById(id);
		if(reminder != null) return ResponseEntity.noContent().build();
		return ResponseEntity.notFound().build();
	}
	
	@GetMapping(path="/reminder/{username}/{id}")
	public Reminder getReminder(@PathVariable String username, @PathVariable long id) {
		return reminderService.findById(id);
	}
	
	@PutMapping(path="/reminder/{username}/{id}")
	public ResponseEntity<Reminder> updateReminder(@PathVariable String username, @PathVariable long id, @RequestBody Reminder reminder) {
		Reminder remResponse =  reminderService.save(reminder);
		return new ResponseEntity<Reminder>(reminder, HttpStatus.OK);
	}
	
	@PostMapping(path="/reminder/{username}")
	public ResponseEntity<Void> createReminder(@PathVariable String username, @RequestBody Reminder reminder) {
		Reminder remResponse =  reminderService.save(reminder);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(remResponse.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
	

}
