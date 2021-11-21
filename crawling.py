from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd

urlList = [  # none ]
nameList = []
# emailList = []
phoneList = []
officeList = []
for i in range(len(urlList)):
    html = urlopen(urlList[i])


    bsObject = BeautifulSoup(html, "html.parser")

    for card in bsObject.find_all("div", {"class": "col"}) :

        strong = card.find("strong")
        name = strong.get_text()
        name = name.strip()
        name = name.replace("(", " ")
        name = name.replace("[", " ")
        names = name.split()
        name = names[0]
        print(name)
        nameList.append(name)

        email = ""
        tel = ""
        office = ""

        category = ""
        content = ""
        for li in card.find_all("li") :
            category = li.find("b")
            content = li.find("i")
            print(category)
            # None return case Error Handling

            category = category.get_text()
            if category=="TEL":
                content = content.get_text()

                if category == "TEL" :
                    if content == "":
                        tel = "데이터가 없습니다."
                    else:
                        tel = content


        if tel == "":
            tel= "데이터가 없습니다."

        phoneList.append(tel)
            # elif category == "OFFICE" :
            #     if content == "":
            #         office = "데이터가 없습니다."
            #     else:
            #         office = content
            #     officeList.append(office)

        print( tel + " ,  " + office)
    # print(len(nameList))
    # print(len(emailList))
information = pd.DataFrame()
information['성함'] = nameList
information['tel'] = phoneList
# information['office'] = officeList
information.to_excel("info.xlsx",index=False)
