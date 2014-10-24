import requests
from bs4 import BeautifulSoup
import json


bars = ["iota-club-and-cafe-arlington", "galaxy-hut-arlington", "world-of-beer-arlington-2", "the-liberty-tavern-arlington"]

for i in bars:
    url = "http://www.yelp.com/biz/" + i
    u = requests.get(url)
    #print u.text

    soup = BeautifulSoup(u.text)
    title = soup.find('h1').text.strip(" ").strip("\t").strip("\n").lstrip(" ")
    address = soup.find('address').text.strip(" ").strip("\t").strip("\n").lstrip(" ")

    hours = [ hour.text for hour in soup.find("div", {'class':'biz-hours'}).findAll("span") ]

    days = [ th.text for th in soup.find("div", {'class':'biz-hours'}).findAll("th") ]


    #print zip(span, th)

    openings = [ ]
    for day in days:
        openings.append({ day : [hours.pop(0), hours.pop(0)]})

    yelp = { }
    yelp["title"] = title
    yelp["address"] = address
    yelp["openings"] = openings

    print json.dumps(yelp)
