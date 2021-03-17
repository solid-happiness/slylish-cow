from typing import List

from server.models import Company
from server.sites.aptekaru.api import AptekaruApi
from server.sites.auchan.api import AuchanApi
from server.sites.diginetica.api import (AllTimeApi, AmWineApi, AzbukaVkusaApi,
                                         BoscoApi, CastoramaApi, CitilinkApi,
                                         ElKompApi, HolodilnikRuApi,
                                         PetrovichApi, SokolovApi,
                                         SportMasterApi, SunlightApi)
from server.sites.ikea.api import IkeaApi
from server.sites.lacoste.api import LacosteApi
from server.sites.nika.api import NikaApi
from server.sites.rivegauche.api import RiveGaucheApi
from server.sites.samsung.api import SamsungApi

COMPANIES_LIST: List[Company] = [
    IkeaApi,
    LacosteApi,
    AuchanApi,
    AptekaruApi,
    NikaApi,
    SamsungApi,
    RiveGaucheApi,
    AllTimeApi,
    AmWineApi,
    AzbukaVkusaApi,
    BoscoApi,
    ElKompApi,
    HolodilnikRuApi,
    PetrovichApi,
    SportMasterApi,
    CastoramaApi,
    CitilinkApi,
    SokolovApi,
    SunlightApi,
]
