from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.

import pickle

def summary(request):
    original = None
    features = None
    with open("../original.dataframe", "rb") as fp:
        original = pickle.load(fp)

    with open("../features.names", "rb") as fp:
        features = pickle.load(fp)

    response = {}

    response['features'] = features
    response['summary'] = original.describe().to_json()
    
    return JsonResponse(response, safe=False)