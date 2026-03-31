
# 20-docker-compose

## Day 20 Docker Compose

---

### Learning Objectives (Summary)

By the end of this day, you will understand:

1. **What Docker Compose Is** – Tool to manage multi-container applications  
2. **Why Docker Compose Is Required** – Simplifies complex setups  
3. **When to Use Compose** – Fullstack and multi-service systems  
4. **How to Use Compose** – YAML-based configuration  
5. **Core Components** – services, networks, volumes  
6. **Production Concepts** – orchestration, scalability, and maintainability  

---

### What is Docker Compose?

- Docker Compose is a **command-line tool** used to define and run **multi-container Docker applications**  
- Uses a configuration file:
  - `compose.yaml` (modern)
  - `docker-compose.yml` (older)  

- Allows you to define:
  - Containers (services)  
  - Networks  
  - Volumes  

## Compose Build Specification




Build is an optional part of the Compose Specification. It tells Compose how to (re)build an application from source and lets you define the build process within a Compose file in a portable way.  `build` can be either specified as a single string defining a context path, or as a detailed build definition.


When `build` is specified as a string, the whole path is used as a
Docker context to execute a Docker build, looking for a canonical
`Dockerfile` at the root of the directory.

When `build` is specified as a detailed structure, build arguments can
be specified, including an alternate `Dockerfile` location.

In both cases, the path can be absolute or relative. If it is relative,
it is resolved from the directory containing your Compose file. If it is
absolute, the path prevents the Compose file from being portable so
Compose displays a warning.

## Using `build` and `image`

When Compose is confronted with both a `build` subsection for a service and an `image` attribute, it follows the rules defined by the [`pull_policy`](/reference/compose-file/build/services/#pull_policy) attribute.

If `pull_policy` is missing from the service definition, Compose attempts to pull the image first and then builds from source if the image isn't found in the registry or platform cache.

## Publishing built images

Compose with `build` support offers an option to push built images to a registry. When doing so, it doesn't try to push service images without an `image` attribute. Compose warns you about the missing `image` attribute which prevents images being pushed.

## Illustrative example

The following example illustrates Compose Build Specification concepts with a concrete sample application. The sample is non-normative.

```yaml
services:
  frontend:
    image: example/webapp
    build: ./webapp

  backend:
    image: example/database
    build:
      context: backend
      dockerfile: ../backend.Dockerfile

  custom:
    build: ~/custom
```

When used to build service images from source, the Compose file creates three Docker images:

- `example/webapp`: A Docker image is built using `webapp` sub-directory, within the Compose file's folder, as the Docker build context. Lack of a `Dockerfile` within this folder returns an error.
- `example/database`: A Docker image is built using `backend` sub-directory within the Compose file's folder. `backend.Dockerfile` file is used to define build steps, this file is searched relative to the context path, which means `..` resolves to the Compose file's folder, so `backend.Dockerfile` is a sibling file.
- A Docker image is built using the `custom` directory with the user's `$HOME` as the Docker context. Compose displays a warning about the non-portable path used to build image.

On push, both `example/webapp` and `example/database` Docker images are pushed to the default registry. The `custom` service image is skipped as no `image` attribute is set and Compose displays a warning about this missing attribute.

## Attributes

The `build` subsection defines configuration options that are applied by Compose to build Docker images from source.
`build` can be specified either as a string containing a path to the build context or as a detailed structure:

Using the string syntax, only the build context can be configured as either:

- A relative path to the Compose file's folder. This path must be a directory and must contain a `Dockerfile`

  ```yml
  services:
    webapp:
      build: ./dir
  ```

- A Git repository URL. Git URLs accept context configuration in their fragment section, separated by a colon (`:`).
  The first part represents the reference that Git checks out, and can be either a branch, a tag, or a remote reference.
  The second part represents a subdirectory inside the repository that is used as a build context.

  ```yml
  services:
    webapp:
      build: https://github.com/mycompany/example.git#branch_or_tag:subdirectory
  ```

Alternatively `build` can be an object with fields defined as follows:

### `additional_contexts`



`additional_contexts` defines a list of named contexts the image builder should use during image build.

`additional_contexts` can be a mapping or a list:

```yml
build:
  context: .
  additional_contexts:
    - resources=/path/to/resources
    - app=docker-image://my-app:latest
    - source=https://github.com/myuser/project.git
```

```yml
build:
  context: .
  additional_contexts:
    resources: /path/to/resources
    app: docker-image://my-app:latest
    source: https://github.com/myuser/project.git
```

When used as a list, the syntax follows the `NAME=VALUE` format, where `VALUE` is a string. Validation beyond that
is the responsibility of the image builder (and is builder specific). Compose supports at least
absolute and relative paths to a directory and Git repository URLs, like [context](#context) does. Other context flavours
must be prefixed to avoid ambiguity with a `type://` prefix.

Compose warns you if the image builder does not support additional contexts and may list
the unused contexts.

Refer to the reference documentation for [`docker buildx build --build-context`](https://github.com/docker/buildx/blob/master/docs/reference/buildx_build.md#-additional-build-contexts---build-context)
for example usage.

`additional_contexts` can also refer to an image built by another service.
This allows a service image to be built using another service image as a base image, and to share
layers between service images.

```yaml
services:
  base:
    build:
      context: .
      dockerfile_inline: |
        FROM alpine
        RUN ...
  my-service:
    build:
      context: .
      dockerfile_inline: |
        FROM base # image built for service base
        RUN ...
      additional_contexts:
        base: service:base
```

### `args`

`args` define build arguments, that is Dockerfile `ARG` values.

Using the following Dockerfile as an example:

```Dockerfile
ARG GIT_COMMIT
RUN echo "Based on commit: $GIT_COMMIT"
```

`args` can be set in the Compose file under the `build` key to define `GIT_COMMIT`. `args` can be set as a mapping or a list:

```yml
build:
  context: .
  args:
    GIT_COMMIT: cdc3b19
```

```yml
build:
  context: .
  args:
    - GIT_COMMIT=cdc3b19
```

Values can be omitted when specifying a build argument, in which case its value at build time must be obtained by user interaction,
otherwise the build argument won't be set when building the Docker image.

```yml
args:
  - GIT_COMMIT
```

### `cache_from`

`cache_from` defines a list of sources the image builder should use for cache resolution.

Cache location syntax follows the global format `[NAME|type=TYPE[,KEY=VALUE]]`. Simple `NAME` is actually a shortcut notation for `type=registry,ref=NAME`.

Compose Build implementations may support custom types, the Compose Specification defines canonical types which must be supported:

- `registry` to retrieve build cache from an OCI image set by key `ref`

```yml
build:
  context: .
  cache_from:
    - alpine:latest
    - type=local,src=path/to/cache
    - type=gha
```

Unsupported caches are ignored and don't prevent you from building images.

### `cache_to`

`cache_to` defines a list of export locations to be used to share build cache with future builds.

```yml
build:
  context: .
  cache_to:
    - user/app:cache
    - type=local,dest=path/to/cache
```

Cache target is defined using the same `type=TYPE[,KEY=VALUE]` syntax defined by [`cache_from`](#cache_from).

Unsupported caches are ignored and don't prevent you from building images.

### `context`

`context` defines either a path to a directory containing a Dockerfile, or a URL to a Git repository.

When the value supplied is a relative path, it is interpreted as relative to the project directory.
Compose warns you about the absolute path used to define the build context as those prevent the Compose file
from being portable.

```yml
build:
  context: ./dir
```

```yml
services:
  webapp:
    build: https://github.com/mycompany/webapp.git
```

If not set explicitly, `context` defaults to project directory (`.`).

### `dockerfile`

`dockerfile` sets an alternate Dockerfile. A relative path is resolved from the build context.
Compose warns you about the absolute path used to define the Dockerfile as it prevents Compose files
from being portable.

When set, `dockerfile_inline` attribute is not allowed and Compose
rejects any Compose file having both set.

```yml
build:
  context: .
  dockerfile: webapp.Dockerfile
```

### `dockerfile_inline`



`dockerfile_inline` defines the Dockerfile content as an inlined string in a Compose file. When set, the `dockerfile`
attribute is not allowed and Compose rejects any Compose file having both set.

Use of YAML multi-line string syntax is recommended to define the Dockerfile content:

```yml
build:
  context: .
  dockerfile_inline: |
    FROM baseimage
    RUN some command
```

### `entitlements`



`entitlements` defines extra privileged entitlements to be allowed during the build.

```yaml
entitlements:
  - network.host
  - security.insecure
```

### `extra_hosts`

`extra_hosts` adds hostname mappings at build-time. Use the same syntax as [`extra_hosts`](/reference/compose-file/build/services/#extra_hosts).

```yml
extra_hosts:
  - "somehost=162.242.195.82"
  - "otherhost=50.31.209.229"
  - "myhostv6=::1"
```

IPv6 addresses can be enclosed in square brackets, for example:

```yml
extra_hosts:
  - "myhostv6=[::1]"
```

The separator `=` is preferred, but `:` can also be used. Introduced in Docker Compose version [2.24.1](https://github.com/docker/compose/releases/tag/v2.24.1). For example:

```yml
extra_hosts:
  - "somehost:162.242.195.82"
  - "myhostv6:::1"
```

Compose creates matching entry with the IP address and hostname in the container's network
configuration, which means for Linux `/etc/hosts` will get extra lines:

```text
162.242.195.82  somehost
50.31.209.229   otherhost
::1             myhostv6
```

### `isolation`

`isolation` specifies a build’s container isolation technology. Like [isolation](/reference/compose-file/build/services/#isolation), supported values
are platform specific.

### `labels`

`labels` add metadata to the resulting image. `labels` can be set either as an array or a map.

It's recommended that you use reverse-DNS notation to prevent your labels from conflicting with other software.

```yml
build:
  context: .
  labels:
    com.example.description: "Accounting webapp"
    com.example.department: "Finance"
    com.example.label-with-empty-value: ""
```

```yml
build:
  context: .
  labels:
    - "com.example.description=Accounting webapp"
    - "com.example.department=Finance"
    - "com.example.label-with-empty-value"
```

### `network`

Set the network containers connect to for the `RUN` instructions during build.

```yaml
build:
  context: .
  network: host
```

```yaml
build:
  context: .
  network: custom_network_1
```

Use `none` to disable networking during build:

```yaml
build:
  context: .
  network: none
```

### `no_cache`

`no_cache` disables image builder cache and enforces a full rebuild from source for all image layers. This only
applies to layers declared in the Dockerfile, referenced images can be retrieved from local image store whenever tag
has been updated on registry (see [pull](#pull)).

### `platforms`

`platforms` defines a list of target [platforms](/reference/compose-file/build/services/#platform).

```yml
build:
  context: "."
  platforms:
    - "linux/amd64"
    - "linux/arm64"
```

When the `platforms` attribute is omitted, Compose includes the service's platform
in the list of the default build target platforms.

When the `platforms` attribute is defined, Compose includes the service's
platform, otherwise users won't be able to run images they built.

Composes reports an error in the following cases:

- When the list contains multiple platforms but the implementation is incapable of storing multi-platform images.
- When the list contains an unsupported platform.

  ```yml
  build:
    context: "."
    platforms:
      - "linux/amd64"
      - "unsupported/unsupported"
  ```

- When the list is non-empty and does not contain the service's platform.

  ```yml
  services:
    frontend:
      platform: "linux/amd64"
      build:
        context: "."
        platforms:
          - "linux/arm64"
  ```

### `privileged`



`privileged` configures the service image to build with elevated privileges. Support and actual impacts are platform specific.

```yml
build:
  context: .
  privileged: true
```

### `provenance`



`provenance` configures the builder to add a [provenance attestation](https://slsa.dev/provenance/v0.2#schema) to the published image.

The value can be either a boolean to enable/disable provenance attestation, or a key=value string to set provenance configuration. You can
use this to select the level of detail to be included in the provenance attestation by setting the `mode` parameter.

```yaml
build:
  context: .
  provenance: true
```

```yaml
build:
  context: .
  provenance: mode=max
```

### `pull`

`pull` requires the image builder to pull referenced images (`FROM` Dockerfile directive), even if those are already
available in the local image store.

### `sbom`



`sbom` configures the builder to add a [provenance attestation](https://slsa.dev/provenance/v0.2#schema) to the published image.
The value can be either a boolean to enable/disable sbom attestation, or a key=value string to set SBOM generator configuration. This let you
select an alternative SBOM generator image (see https://github.com/moby/buildkit/blob/master/docs/attestations/sbom-protocol.md)

```yaml
build:
  context: .
  sbom: true
```

```yaml
build:
  context: .
  sbom: generator=docker/scout-sbom-indexer:latest # Use an alternative SBOM generator
```

### `secrets`

`secrets` grants access to sensitive data defined by [secrets](/reference/compose-file/build/services/#secrets) on a per-service build basis. Two
different syntax variants are supported: the short syntax and the long syntax.

Compose reports an error if the secret isn't defined in the
[`secrets`](/reference/compose-file/build/secrets/) section of this Compose file.

#### Short syntax

The short syntax variant only specifies the secret name. This grants the
container access to the secret and mounts it as read-only to `/run/secrets/<secret_name>`
within the container. The source name and destination mountpoint are both set
to the secret name.

The following example uses the short syntax to grant the build of the `frontend` service
access to the `server-certificate` secret. The value of `server-certificate` is set
to the contents of the file `./server.cert`.

```yml
services:
  frontend:
    build:
      context: .
      secrets:
        - server-certificate
secrets:
  server-certificate:
    file: ./server.cert
```

#### Long syntax

The long syntax provides more granularity in how the secret is created within
the service's containers.

- `source`: The name of the secret as it exists on the platform.
- `target`: The ID of the secret as declared in the Dockerfile. Defaults to `source` if not specified.
- `uid` and `gid`: The numeric uid or gid that owns the file within
  `/run/secrets/` in the service's task containers. Default value is `USER`.
- `mode`: The [permissions](https://wintelguy.com/permissions-calc.pl) for the file to be mounted in `/run/secrets/`
  in the service's task containers, in octal notation.
  Default value is world-readable permissions (mode `0444`).
  The writable bit must be ignored if set. The executable bit may be set.

The following example sets the name of the `server-certificate` secret file to `server.crt`
within the container, sets the mode to `0440` (group-readable) and sets the user and group
to `103`. The value of `server-certificate` secret is provided by the platform through a lookup and
the secret lifecycle not directly managed by Compose.

```yml
services:
  frontend:
    build:
      context: .
      secrets:
        - source: server-certificate
          target: cert # secret ID in Dockerfile
          uid: "103"
          gid: "103"
          mode: 0440
secrets:
  server-certificate:
    external: true
```

```dockerfile
# Dockerfile
FROM nginx
RUN --mount=type=secret,id=cert,required=true,target=/root/cert ...
```

Service builds may be granted access to multiple secrets. Long and short syntax for secrets may be used in the
same Compose file. Defining a secret in the top-level `secrets` must not imply granting any service build access to it.
Such grant must be explicit within service specification as [secrets](/reference/compose-file/build/services/#secrets) service element.

### `ssh`

`ssh` defines SSH authentications that the image builder should use during image build (e.g., cloning private repository).

`ssh` property syntax can be either:

- `default`: Let the builder connect to the SSH-agent.
- `ID=path`: A key/value definition of an ID and the associated path. It can be either a [PEM](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) file, or path to ssh-agent socket.

```yaml
build:
  context: .
  ssh:
    - default # mount the default SSH agent
```

or

```yaml
build:
  context: .
  ssh: ["default"] # mount the default SSH agent
```

Using a custom id `myproject` with path to a local SSH key:

```yaml
build:
  context: .
  ssh:
    - myproject=~/.ssh/myproject.pem
```

The image builder can then rely on this to mount the SSH key during build.

For illustration, [SSH mounts](https://github.com/moby/buildkit/blob/master/frontend/dockerfile/docs/reference.md#run---mounttypessh) can be used to mount the SSH key set by ID and access a secured resource:

```console
RUN --mount=type=ssh,id=myproject git clone ...
```

### `shm_size`

`shm_size` sets the size of the shared memory (`/dev/shm` partition on Linux) allocated for building Docker images. Specify
as an integer value representing the number of bytes or as a string expressing a [byte value](/reference/compose-file/build/extension/#specifying-byte-values).

```yml
build:
  context: .
  shm_size: "2gb"
```

```yaml
build:
  context: .
  shm_size: 10000000
```

### `tags`

`tags` defines a list of tag mappings that must be associated to the build image. This list comes in addition to
the `image` [property defined in the service section](/reference/compose-file/build/services/#image)

```yml
tags:
  - "myimage:mytag"
  - "registry/username/myrepos:my-other-tag"
```

### `target`

`target` defines the stage to build as defined inside a multi-stage `Dockerfile`.

```yml
build:
  context: .
  target: prod
```

### `ulimits`



`ulimits` overrides the default `ulimits` for a container. It's specified either as an integer for a single limit
or as mapping for soft/hard limits.

```yml
services:
  frontend:
    build:
      context: .
      ulimits:
        nproc: 65535
        nofile:
          soft: 20000
          hard: 40000
```
# Compose Develop Specification


> [!NOTE] 
>
> Develop is an optional part of the Compose Specification. It is available with Docker Compose version 2.22.0 and later.





This page defines how Compose behaves to efficiently assist you and defines the development constraints and workflows set by Compose. Only a subset of Compose file services may require a `develop` subsection.

## Illustrative example

```yaml
services:
  frontend:
    image: example/webapp
    build: ./webapp
    develop:
      watch: 
        # sync static content
        - path: ./webapp/html
          action: sync
          target: /var/www
          ignore:
            - node_modules/

  backend:
    image: example/backend
    build: ./backend
    develop:
      watch: 
        # rebuild image and recreate service
        - path: ./backend/src
          action: rebuild
```

## Attributes

The `develop` subsection defines configuration options that are applied by Compose to assist you during development of a service with optimized workflows.

### `watch`

The `watch` attribute defines a list of rules that control automatic service updates based on local file changes. `watch` is a sequence, each individual item in the sequence defines a rule to be applied by 
Compose to monitor source code for changes. For more information, see [Use Compose Watch](/compose/how-tos/file-watch/).

#### `action`

`action` defines the action to take when changes are detected. If `action` is set to:

- `rebuild`: Compose rebuilds the service image based on the `build` section and recreates the service with the updated image.
- `restart`: Compose restarts the service container. Available with Docker Compose version 2.32.0 and later.
- `sync`: Compose keeps the existing service container(s) running, but synchronizes source files with container content according to the `target` attribute.
- `sync+restart`: Compose synchronizes source files with container content according to the `target` attribute, and then restarts the container. Available with Docker Compose version 2.23.0 and later.
- `sync+exec`: Compose synchronizes source files with container content according to the `target` attribute, and then executes a command inside the container. Available with Docker Compose version 2.32.0 and later.

#### `exec`



`exec` is only relevant when `action` is set to `sync+exec`. Like [service hooks](/reference/compose-file/develop/services/#post_start), `exec` is used to define the command to be run inside the container once it has started.

- `command`: Specifies the command to run once the container starts. This attribute is required, and you can choose to use either the shell form or the exec form.
- `user`: The user to run the command. If not set, the command is run with the same user as the main service command.
- `privileged`: Lets the command run with privileged access.
- `working_dir`: The working directory in which to run the command. If not set, it is run in the same working directory as the main service command.
- `environment`: Sets the environment variables to run the command. While the command inherits the environment variables defined for the service’s main command, this section lets you add new variables or override existing ones.

```yaml
services:
  frontend:
    image: ...
    develop:
      watch: 
        # sync content then run command to reload service without interruption
        - path: ./etc/config
          action: sync+exec
          target: /etc/config/
          exec:
            command: app reload
```

#### `ignore`

The `ignore` attribute is used to define a list of patterns for paths to be ignored. Any updated file
that matches a pattern, or belongs to a folder that matches a pattern, won't trigger services to be re-created. 
The syntax is the same as `.dockerignore` file: 

- `*` matches 0 or more characters in a filename. 
- `?` matches a single character in filename. 
- `*/*` matches two nested folders with arbitrary names
- `**` matches an arbitrary number of nested folders

If the build context includes a `.dockerignore` file, the patterns in this file is loaded as implicit content
for the `ignores` file, and values set in the Compose model are appended.

#### `include`

It is sometimes easier to select files to be watched instead of declaring those that shouldn't be watched with `ignore`.

The `include` attribute is used to define a pattern, or a list of patterns, for paths to be considered for watching.
Only files that match these patterns will be considered when applying a watch rule. The syntax is the same as `ignore`.

```yaml
services:
  backend:
    image: example/backend
    develop:
      watch: 
        # rebuild image and recreate service
        - path: ./src
          include: "*.go"  
          action: rebuild
```

> [!NOTE]
> 
> In many cases `include` patterns start with a wildcard (`*`) character. This has special meaning in YAML syntax
> to define an [alias node](https://yaml.org/spec/1.2.2/#alias-nodes) so you have to wrap pattern expression with quotes.

#### `initial_sync`

When using `sync+x` actions, it can be useful to ensure that files inside containers are up to date at the start of a new watch session.

The `initial_sync` attribute instructs the Compose runtime, if containers for the service already exist, to check that the files from the path attribute are in sync within the service containers.

#### `path`

`path` attribute defines the path to source code (relative to the project directory) to monitor for changes. Updates to any file
inside the path, which doesn't match any `ignore` rule, triggers the configured action.

#### `target`

`target` attribute only applies when `action` is configured for `sync`. Files within `path` that have changes are synchronized with the container's filesystem, so that the latter is always running with up-to-date content.



`
## Docker Compose Commands Summary

| Command                            | Description                |
| ---------------------------------- | -------------------------- |
| `docker compose up`                | Start all services         |
| `docker compose up -d`             | Run in background          |
| `docker compose down`              | Stop and remove everything |
| `docker compose build`             | Build images               |
| `docker compose ps`                | Show running containers    |
| `docker compose ls`                | List projects              |
| `docker compose logs`              | View logs                  |
| `docker compose exec <service> sh` | Access container           |
| `docker compose restart`           | Restart services           |
| `docker compose pull`              | Pull images                |
| `docker compose push`              | Push images                |
| `docker compose config`            | Validate YAML              |



---

[⬅ Previous: Day 19 Multistage Builds](../19-multistage-builds/) | 
