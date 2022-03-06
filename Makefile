$(VERBOSE).SILENT:

# Colors
CYAN=\033[0;36m
RED=\033[0;31m
GREEN=\033[0;32m
NONE=\033[0m

# Paths
CWD=$(shell pwd)
EXTENSION_NAME="$(notdir $(shell pwd))"
DEST_PATH="${HOME}/.local/share/gnome-shell/extensions/${EXTENSION_NAME}"

.DEFAULT_GOAL := help
.PHONY: help

help: ## Show this help
	printf "Usage: make [$(GREEN)target$(NONE)]\n"
	printf "Available targets:\n"
	grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(CYAN)%-20s$(NONE) %s\n", $$1, $$2}'

check_dest_dir: ## Check if dest path exists
	printf "Checking destination path $(CYAN)$(DEST_PATH)$(NONE) [  ]\n"
	if [ ! -d $(DEST_PATH) ]; then \
		printf "Creating dest directory [  ]\n"; \
		mkdir -p $(DEST_PATH) || (printf "Creating dest directory [$(RED)KO$(NONE)]\n"; exit;); \
		printf "Creating dest directory [$(GREEN)OK$(NONE)]\n"; \
	fi
	printf "Checking destination path $(CYAN)$(DEST_PATH)$(NONE) [$(GREEN)OK$(NONE)]\n"

check_deps: ## Check dependencies
	printf "Checking for dependencies [  ]\n"
	which rsync > /dev/null || (printf "Checking for dependencies [$(RED)KO$(NONE)]\n"; exit 1)
	printf "Checking for dependencies [$(GREEN)OK$(NONE)]\n"

sync: ## Syncing to dest directory
sync: check_deps check_dest_dir
	printf "Syncing to dest directory [  ]\n"
	rsync -arz --files-from=./sync-list.txt $(CWD) $(DEST_PATH) || (printf "Syncing to dest directory [$(RED)KO$(NONE)]\n"; exit 1)
	printf "Syncing to dest directory [$(GREEN)OK$(NONE)]\n"

restart_shell: ## Restart gnome shell
	printf "Restarting Gnome shell [  ]\n"
	gdbus call --session --dest org.gnome.Shell --object-path /org/gnome/Shell --method org.gnome.Shell.Eval 'Meta.restart(_("Restarting…"))'
	printf "Restarting Gnome shell [$(GREEN)OK$(NONE)]\n"

enable: ## Enable this extension
	printf "Enabling extension [  ]\n"
	gnome-extensions enable $(EXTENSION_NAME)
	printf "Enabling extension [$(GREEN)OK$(NONE)]\n"

disable: ## Enable this extension
	printf "Disabling extension [  ]\n"
	gnome-extensions disable $(EXTENSION_NAME)
	printf "Disabling extension [$(GREEN)OK$(NONE)]\n"

deploy: ## Deploy a new version
deploy:
deploy: disable sync restart_shell enable
