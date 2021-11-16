from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd

urlList = [
  #none

]

for i in range(len(urlList)):
    html = urlopen(urlList[i])
    nameList =[]
    emailList = []
    phoneList = []
    officeList = []

    bsObject = BeautifulSoup(html, "html.parser")

    for card in bsObject.find_all("div", {"class": "card--body"}) :

        strong = card.find("strong")
        name = strong.get_text()
        name = name.strip()
        name = name.replace("(", " ")
        name = name.replace("[", " ")
        names = name.split()
        name = names[0]
        # print(name)
        nameList.append(name)

        email = ""
        tel = ""
        office = ""

        category = ""
        content = ""
        for li in card.find_all("li") :
            category = li.find("b")
            content = li.find("i")
            # None return case Error Handling


            category = category.get_text()
            content = content.get_text()

            if content == "":
                content = "정보 없음"

            if category == "E-MAIL" :
                email = content
                emailList.append(email)
            elif category == "TEL" :
                tel = content
                phoneList.append(tel)
            elif category == "OFFICE" :
                office = content
                officeList.append(office)

        # print(email + " " + tel + " " + office)
    print(len(nameList))
    print(len(emailList))
    information = pd.DataFrame()
    information['성함'] = nameList
    information['이메일'] = emailList
    information['tel'] = phoneList
    # information['office'] = officeList

    infoString = "info_" + str(i)
    information.to_csv(infoString,index=False)
