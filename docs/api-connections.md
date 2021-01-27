# API v1 Connection Planning

## Schemas

- User
- Employee
- Timetable
  - times
- Availability
  - *linked to timetables*
  - user
  - times (array of selections (array of preferences))

## Endpoints

### Employer

- getCurrentUser

- createEmployee
- updateEmployee
- deleteEmployee

- getEmployees

### Employee

- createUser
- updateUser
- deleteUser

- getShifts
- requestShifts

### Scheduling

- createTimetable
- deleteTimetable

- getTimetable

- submitAvailability
- getAvailability
