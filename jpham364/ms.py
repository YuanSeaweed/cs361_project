# Zhi Liang's implementation of a microservice for Jonathan Pham's CS361 Project

import os
import os.path
import time
import random

def readFiles(currentlist, filenumber):
    filepath = "planner/" + str(filenumber) + ".txt"
    with open(filepath, 'r', encoding="utf-8") as file:
        # Read the content of the file
        file_content = file.read()

        # Split the content into a list using the '~' delimiter
        currentlist.extend(file_content.split('~'))

print("Waiting for foodie.py...\n")

while True: 

    time.sleep(3)

    requestExists = "request.txt"
    filesExist = os.path.isfile(requestExists)

    while (filesExist == True):

        repeat = "request.txt"
        filesExist = os.path.isfile(requestExists)

        if filesExist == False:
            continue

        outputlist = []

        firstlist = []
        readFiles(firstlist, 1)

        # get the number of files to read
        numfiles = firstlist[len(firstlist)-1]

        # generate a random number to from 0 to len(firstlist) - 1
        randomindex = random.randint(0, len(firstlist)-2)

        # append the selected restaurant to outputlist
        outputlist.append(firstlist[randomindex])

        if (int(numfiles) > 1):
            for i in range(2, int(numfiles)+1):
                currentlist = []
                readFiles(currentlist, i)
                randomindex = random.randint(0, len(currentlist)-2)
                outputlist.append(currentlist[randomindex])
                #print(currentlist)

        # Write the list to a text file
        with open('output.txt', 'w') as file:
            # Write each restaurant on a new line
            for item in outputlist:
                file.write(f"{item}\n")
        
        print("Here is your restaurant plan! It is also written in the file output.txt")
        print(outputlist)
            
        requestExists = "request.txt"
        check_file_stall = os.path.isfile(requestExists)

        print("\nSuccessfully created restaurant plan!\n")
        while check_file_stall == True:
            requestExists = "request.txt"
            check_file_stall = os.path.isfile(requestExists)

        print("Waiting for foodie.py...\n")
        break