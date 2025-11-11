from pathlib import Path  
from dynaconf import Dynaconf  
  
settings = Dynaconf(  
    root_path=Path(__file__).parent,  
    envvar_prefix="DYNACONF",  
    settings_files=["settings.toml", ".secrets.toml"],  
)