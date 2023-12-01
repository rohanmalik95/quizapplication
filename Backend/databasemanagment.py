import pymongo
from flask import Flask,request
from flask_cors import CORS
import json

#Initializing the application and the mongodb database
#Adding the provision for the CORS requests

app = Flask(__name__)
CORS(app)
PORT = 5001
connectionDatabase = pymongo.MongoClient("mongodb://127.0.0.1:27017")

database = connectionDatabase["Quizapp"]


#Checking if the collection with the name questions exists , if it does not exist then creating one 

if "questions" not in database.list_collection_names():
    print("collection not found in databse.Craeting a new collection")
    database.create_collection("questions")
    database.create_collection("categories")

collection = database["questions"]
collection2 = database["categories"]





#Defining a route for the add question method
@app.route("/addquestion", methods=["POST"])
def addquestion():
    data = request.get_json()
    print("data shared over the API is")
    print(data)
    addtodb=collection.insert_one(data)
    if addtodb.acknowledged == True:
        print("Question added successfully!")
        payload = {"success":True}
        return payload
    else:
        print("Adding the question failed!")
        return "failure"

#Defining a route for the get all questions method
@app.route("/getall", methods=["POST"])
def getall():
    data = request.get_json()
    getdata = collection.find(data)
    print("fetched all the questions from the database")
    cursor=[]
    for i in getdata:
        i["_id"] = str(i["_id"])
        cursor.append(i)
    return cursor
print("*"*90)
print("Starting the applicatoin!")



#Defining CRUD routes for the categories

#Defining the route for adding categories to the database
@app.route("/addcategory", methods=["POST"])
def addcategory():
    print("Starting the route for the add category!")
    data = request.get_json()
    print("Adding the category !"+str(data))
    addData = collection2.insert_one(data)
    if (addData.acknowledged == True):
        payload = {"success":True}
        return payload
    elif (addData.acknowledged == False):
        payload = {"success":False}
        return payload


#Defining route to get all the categories from the database
@app.route("/getcategory",methods=["GET"])
def getcategory():
    print("starting the route for the getall cateogries")
    payload = collection2.find({})
    print("sending data throught he api as :"+str(payload))
    cursor=[]
    for i in payload:
        x = i["name"]
        cursor.append(x)
    return cursor


#Defining route for the deletion of a category
@app.route("/deletecategory",methods=["POST"])
def deletecategory():
    data = request.get_json()
    print("deleting data fromt he lsit"+str(data))
    deleteData = collection2.find_one_and_delete({"name":data["name"]})
    print("Deleting successful! " + str(deleteData))
    payload = {"success":True}
    return payload













app.run(debug=True, port=PORT)
