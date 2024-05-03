# Graphical Report of Data

This is my personal project developed for practicing my skills.

## What is this project all about?

This is project is about showing machine data present in **json** file to **Graphical Representation**. Project uses sample data in the format of json file and renders it onto the web page. We can also make use of any databases such as MySQL, MongoDB, etc. to use fetch data but as this is only practice project made by me, I preferred to use json file for now. In future, this project can be expanded to include database and also improved UI/UX.

### What is need for it?

Today we see that data generated by machines and human is in large amount which is of order 10<sup>12</sup>bytes each day. To get some information or conclusion from it, it should be represented in some imaginable presentation. Those can be of many types such as graphs, tables, motion graphics, etc. Now we can draw some conclusion from data and work on it for some business needs, personal needs or for any scientific research,etc.

## What I actually did?

So, I used graph to show **sample machine data** in horizontal bar graph presentation. Data is present in json file of following format

```json
{
    "ts" : Timestamp in __string__ format,
    "machine_status" : Machine status (1 or 0),
    "vibration" : Vibration value (integer type)
}
```

We have to select **start time** for graph and also set **time frequency** **(amount of time for which we want to look for which is in "hrs")**, after doing this we can see rendered data.
I also used table to show for how many times the machine was in `0` state and `1` state and the `total` of it. This also helps to understand the data for selected time slot.

### Developed using

- Language: Javascript
- Fontend: Reactjs
- Backend: Nodejs, Express
- APIs: REST architectural pattern

## Output

Below, I am attaching screentshots of webpage which is highly responsive

- Desktop
  ![Desktop: Server is not running](</Screenshots/Desktop/Desktop%20(1).png>)
  ![Desktop: Start time is 2024-01-21 03:00PM and frequency is 1hrs](</Screenshots/Desktop/Desktop%20(2).png>)
  ![Desktop: Start time is 2024-01-20 08:00PM and frequency is 24hrs](</Screenshots/Desktop/Desktop%20(3).png>)
- Mobile
  ![Mobile: Server is not running](</Screenshots/Mobile/Mobile%20(1).png>)
  ![Mobile: Start time is 2024-01-21 03:00PM and frequency is 8hrs](</Screenshots/Mobile/Mobile%20(2).png>)
  ![Mobile: Start time is 2024-01-21 11:00AM and frequency is 8hrs](</Screenshots/Mobile/Mobile%20(3).png>)

## Future scopes

- :white_check_mark: We can add database to store and fetch data
- :white_check_mark: Make some optimization on server side to process data in less time .
- :white_check_mark: Improve UI/UX to more engage users
- :white_check_mark: Metadata for graph can be added (like x and y axes values)
  And the list goes on as per our needs :smiley:

## Wrapping-up

**As you have approached here, I want to thank you for reaching out here. Have a great and prosperous life ahead!! :heart: :smiley:**
