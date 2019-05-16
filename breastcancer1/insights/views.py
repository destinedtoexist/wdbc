from django.shortcuts import render
from django.http import JsonResponse


import pickle
import numpy as np
import pandas as pd

# Create your views here.


def corrcoef(request):
    original = None
    features = None
    with open("../original.dataframe", "rb") as fp:
        original = pickle.load(fp)

    with open("../features.names", "rb") as fp:
        features = pickle.load(fp)

    corr = np.corrcoef(original.loc[:, features], rowvar=False)
    corr = pd.DataFrame(corr, index=features, columns=features)
    return JsonResponse(corr.to_json(), safe=False)
