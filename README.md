# Pomodoro
A clock can help users focus on their working, studying or even room cleaning.

## Features

### Basic
Counter function, which counts down every second until user stop it.
User can change state of clock by clicking button.
After one pomodoro duration is finished, the content will be recorded.

### Record
After logging in, users will be able to record each work content into their account, which including:
- work time
- rest time
- over-work time
- over-rest time
- work content

### Analysis
In analysis page, users can see charts of analysis to understand how hard-working/lazy were they in the past time.
Analysis can be filtered by:
- Day
- Week
- Month
- Year
- Custom duration
- Work content

## Skills

### Redux
In this project, I'm goning to use redux to manage states.
The actions would be:
- `user`
    - `user/authenticationSetToGoogle`
    - `user/authenticationSetToApple`
    - `user/accountSetEmail`
- `clcok`
    - `clock/clockStateSetToIdle`
    - `clock/clockStateSetToWork`
    - `clock/clockStateSetToRest`
    - `clock/clockStateSetToStop`
    - `clock/clockStateSetToNext`
    - `clock/clockStateSetToClear`
    - `clock/clockRecordAdded(id)`
    - `clock/clockRecordEdited(id)`
- `filter`
    - `filter/timeFilterChanged(time)`
    - `filter/contentFilterChanged(text)`

### Firebase
This project will use firebase to authenticate account and store data in user's account.

