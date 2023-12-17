from dynaconf import Dynaconf

settings = Dynaconf(
    settings_files=[
        "apiculture/config/settings.toml",
        "apiculture/config/.secrets.toml",
    ],
    environments=True,
)
