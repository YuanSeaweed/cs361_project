import random

def readFiles(currentlist, filenumber):
    filepath = "planner/" + str(filenumber) + ".txt"
    with open(filepath, 'r', encoding="utf-8") as file:
        # Read the content of the file
        file_content = file.read()

        # Split the content into a list using the '~' delimiter
        currentlist.extend(file_content.split('~'))

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

print("Here is your restaurant plan!")
print(outputlist)