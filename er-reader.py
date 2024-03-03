import os
import json
from hexedit import get_names, get_levels, get_stats, get_play_time

def parse_save_file(file_path):
    """
    Parses the save file to retrieve detailed information including character names, levels, and named stats.

    Args:
        file_path (str): Path to the save file.

    Returns:
        dict: A dictionary containing detailed information about the save file, including character names, levels, and named stats.
    """
    save_data = {
        "characters": []
    }

    # Define a list of stat names in the order they appear in the stats array
    stat_names = ["Vigor", "Mind", "Endurance", "Strength", "Dexterity", "Intelligence", "Faith", "Arcane"]

    character_names = get_names(file_path)
    character_levels = get_levels(file_path)

    for idx, name in enumerate(character_names):
        if name:  # Ensure there's a name, indicating a valid character slot
            stats = get_stats(file_path, idx + 1)
            # Assuming stats[0] contains the actual stat values
            named_stats = {stat_names[i]: stats[0][i] for i in range(len(stat_names))}

            character_info = {
                "name": name,
                "level": character_levels[idx] if idx < len(character_levels) else None,
                "stats": named_stats
            }
        else:
            character_info = {
                "name": "Empty Slot",
                "level": None,
                "stats": {}
            }

        save_data["characters"].append(character_info)

    # Example addition of play time to each character's information:
    for idx, character in enumerate(save_data["characters"]):
        # Assuming characters are 1-indexed in your file
        character["play_time"] = get_play_time(file_path, idx + 1)

    return save_data


def export_to_json(data, output_path):
    """
    Exports the parsed data to a JSON file.

    Args:
        data (dict): The data to export.
        output_path (str): The path to the output JSON file.

    Returns:
        None
    """
    with open(output_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)

def find_save_files(directory, filename="ER0000.sl2"):
    """
    Searches recursively for files with the specified name within the given directory and nested directories.

    Args:
        directory (str): The path of the directory to search in.
        filename (str): The name of the file to search for. Defaults to "ER0000.sl2".

    Returns:
        list: A list of full file paths for all found files.
    """
    matches = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file == filename:
                matches.append(os.path.join(root, file))
    return matches


if __name__ == "__main__":
    directory_path = "./Backups"  # Ensure this is the correct path
    output_path = "output.json"

    save_files = find_save_files(directory_path)
    print(save_files)
    all_save_data = {"saves": []}  # Modified to include file path

    for file_path in save_files:
        print(file_path)
        save_data = {
            "file_path": file_path,
            "data": parse_save_file(file_path)  # Store the return of parse_save_file
        }
        all_save_data["saves"].append(save_data)

    export_to_json(all_save_data, output_path)
    print(f"Data from {len(save_files)} save files exported to {output_path}")

