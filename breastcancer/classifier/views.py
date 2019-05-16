from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from sklearn import naive_bayes
from sklearn import metrics
from sklearn.linear_model import LogisticRegression
from sklearn import svm
from sklearn import tree
from sklearn.ensemble import RandomForestClassifier

import pandas as pd
import numpy as np

import json

from json import JSONEncoder


import pickle
from sklearn.model_selection import train_test_split
# Create your views here.

@csrf_exempt
def split(request):
    if(request.method == 'POST'):
        data = json.loads(request.body)
        features = []
        original = {}
        with open("../features.names", "rb") as fp:
            features = pickle.load(fp)

        with open("../original.dataframe", "rb") as fp:
            original = pickle.load(fp)

        split = train_test_split(original.loc[:, features], original.loc[:, ['diagnosis']], test_size=float(data['testSize'])/100)

        with open("../train_and_test.split", "wb") as fp:
            pickle.dump(split, fp)

        response = {}
        response['train'] = split[0].shape[0]
        response['test'] = split[1].shape[0]

        return JsonResponse(response)


@require_http_methods(["POST"])
@csrf_exempt
def classify(request):
    params = json.loads(request.body)
    trainX, testX, trainY, testY = None, None, None, None
    with open("../train_and_test.split", "rb") as fp:
        trainX, testX, trainY, testY = pickle.load(fp)
    trainX = trainX.loc[:, params['vars']]
    testX = testX.loc[:, params['vars']]
    
    algo = None
    if params['algo'] == 'nb':
        algo = naive_bayes.GaussianNB()
        

    elif params['algo'] == 'lr':
        algo = LogisticRegression(random_state=0, solver='lbfgs', multi_class='multinomial')

    elif params['algo'] == 'svm':
        algo = svm.SVC(gamma='scale', probability=True)

    elif params['algo'] == 'tree':
        algo = tree.DecisionTreeClassifier()

    elif params['algo'] == 'forest':
        algo = RandomForestClassifier(n_estimators=100, max_depth=2, random_state=0) 

    clf = algo.fit(trainX, trainY.values.ravel())

    predicted = clf.predict(testX)
    
    conf = metrics.confusion_matrix(testY=='M', predicted=='M')
    conf = pd.DataFrame(conf, index=['Actual_No', 'Actual_Yes'], columns=['Predicted_No', 'Predicted_Yes'])

    predicted_prob = clf.predict_proba(testX)
    average_precision_score = metrics.average_precision_score(testY=='M', predicted_prob[:,1])
    precision_recall = pd.DataFrame(metrics.precision_recall_curve(testY=='M', predicted_prob[:,1]), index=['precision', 'recall', 'thresholds'])

    response = {}
    response['confusion'] = conf.to_json()
    response['average_precision_score'] = average_precision_score
    response['precision_recall'] = precision_recall.to_json()

    return JsonResponse(response, safe=False)