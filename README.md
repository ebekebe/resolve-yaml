# Merge YAML files and resolve relative file paths

I needed a tool to merge docker-compose files.
`docker-compose config` was ill suited, because it skips unsupported options
like `deploy` that are only used by `docker stack deploy`.

In contrast to existing tools like [merge-yaml](https://github.com/skapoor/merge-yaml)
this tool transforms relative paths, so the paths are still valid in the merged
file. Every string element that starts with `./` is considered a path and is
transformed relative to the current working directory.


## Installation

`npm install -g resolve-yaml`


## Usage

`resolve-yaml file1.yaml file2.yaml [...] >out.yaml`


## Example

`resolve-yaml dir1/docker-compose.yml dir2/docker-compose.yaml >out.yaml`


**dir1/docker-compose.yml**

```yaml
version: '3'
services:
  serviceA:
    build: ./
```

**dir2/docker-compose.yml**

```yaml
version: '3'
services:
  serviceB:
    build: ./subdirectory
```

**out.yml**

```yaml
version: '3'
services:
  serviceA:
    build: ./dir1

  serviceB:
    build: ./dir2/subdirectory
```
