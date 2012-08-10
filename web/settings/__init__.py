from .default import *
from .media import MEDIA_BUNDLES
try:
    from .local import *
except ImportError:
    pass
