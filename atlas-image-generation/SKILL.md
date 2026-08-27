---
name: atlas-image-generation
description: "Generate and download images through Atlas Cloud with live model discovery, schema-validated inputs, one-time task submission, and bounded result polling."
version: "1.0.0"
author: binyangzhu000-sudo
license: MIT

category: visualization
tags:
  - image-generation
  - atlas-cloud
  - api
  - automation
department: Design/Marketing

models:
  recommended:
    - claude-sonnet-4
    - claude-opus-4
  compatible:
    - claude-3-5-sonnet
    - gpt-4
    - gpt-4o

data_sources:
  - name: Atlas Cloud
    url: https://api.atlascloud.ai/api/v1/models
    type: api
    api_key_required: true

input:
  required:
    - type: text
      name: prompt
      description: The image brief, including subject, composition, style, and intended use
  optional:
    - type: text
      name: model
      description: An exact image model ID confirmed in the live Atlas Cloud catalog
    - type: text
      name: output_path
      description: Local path for the downloaded image

output:
  primary:
    type: image
    format: model-defined
  artifacts:
    - type: file
      name: generated-image
      description: The downloaded final image when a file-capable tool is available

capabilities:
  - live_model_discovery
  - schema_validated_generation
  - asynchronous_result_polling
  - image_download

languages:
  - en
  - zh

related_skills:
  - image-generation
---

# Atlas Image Generation Skill

## Overview

Use Atlas Cloud as an optional image-generation provider when the user wants an
image artifact rather than prompt advice alone. Discover models and their input
schemas at runtime because model IDs and parameters can change.

Use the related `image-generation` skill when the user only needs prompt
engineering. This skill is for direct API generation and requires an HTTP-capable
tool plus an `ATLASCLOUD_API_KEY` environment variable.

**What I can do:**
- Find currently visible Atlas Cloud image models
- Validate request fields against the selected model's live schema
- Submit one image task and poll it to a terminal state
- Download the returned image when local file access is available

**What I cannot do:**
- Generate without a configured API key and an HTTP execution tool
- Promise that a remembered model ID or parameter is still valid
- Retry a generation POST safely, because it may create a second billable task
- Keep temporary output URLs available indefinitely

---

## Safety Contract

Follow these rules for every generation:

1. Read `ATLASCLOUD_API_KEY` from the environment. Never print, log, embed, or
   commit it.
2. Fetch the live model catalog immediately before choosing a model.
3. Use only an image model whose catalog entry is visible to the console.
4. Fetch that model's schema URL and build the request only from
   `components.schemas.Input`.
5. Send the generation POST exactly once. Do not automatically retry it after a
   timeout or ambiguous response.
6. Retry only result GET requests, with a fixed attempt limit and backoff.
7. Download successful output URLs promptly because they may expire.
8. If any required tool or credential is missing, explain the blocker and stop
   before submission.

---

## Workflow

### Step 1: Refine the brief

Confirm the subject, composition, visual style, aspect ratio, required text,
brand constraints, and intended use. Turn them into one concrete prompt. Do not
silently add people, logos, copyrighted characters, or unsafe content.

### Step 2: Discover a live image model

Request:

```text
GET https://api.atlascloud.ai/api/v1/models
```

Filter the response to image-capable entries with `display_console: true`.
Match the user's requested capability, then retain the exact model ID and its
schema URL. If the user supplied a model ID, verify it instead of trusting it.

When several models fit, present a short comparison and ask the user to choose
only when quality, latency, or input requirements materially differ. Otherwise,
select the most direct match and state the selection.

### Step 3: Validate the input schema

Fetch the schema URL from the selected catalog entry. Inspect:

```text
components.schemas.Input.required
components.schemas.Input.properties
```

Always include every required field. Add optional values only when the exact
property exists and the value satisfies its type, enum, and limits. Never infer
parameter names from another model.

Before submission, summarize the non-secret request fields for the user. Keep
the API key out of the summary.

### Step 4: Submit once

Send one authenticated JSON request to the image endpoint declared by the live
schema, normally:

```text
POST https://api.atlascloud.ai/api/v1/model/generateImage
Authorization: Bearer ${ATLASCLOUD_API_KEY}
Content-Type: application/json
```

The JSON body must contain the verified model ID, the final prompt, and only
schema-supported options. Record the returned request ID. If the POST response
is missing an ID, times out, or is otherwise ambiguous, stop and report that the
task outcome is unknown. Do not submit again.

### Step 5: Poll with a bound

Use the result GET path declared by the same schema, commonly:

```text
GET https://api.atlascloud.ai/api/v1/model/result/{request_id}
```

Poll at a moderate interval. Use a finite attempt count or time deadline. GET
requests may be retried for `429`, transient `5xx`, or network failures with
bounded backoff. Stop immediately on a terminal success or failure state.

Treat these cases distinctly:

- **Succeeded:** Extract the final output URL or base64 result.
- **Failed:** Report the API error without inventing an output.
- **Timed out while polling:** Report the request ID and unknown final status;
  do not create a replacement task.

### Step 6: Deliver the artifact

If the result is a URL and local file tools are available, download it promptly
to the requested path. Verify that the file is non-empty and has a valid image
type. Return the file path and a compact generation summary.

If downloading is unavailable, return the temporary output URL and warn that it
may expire. Never claim a file was saved unless it was verified.

---

## Output Format

```markdown
## Generation Result

- Status: succeeded | failed | polling-timeout | blocked
- Model: <verified live model ID>
- Request ID: <ID, when submission succeeded>
- Artifact: <verified local path or temporary output URL>
- Prompt: <final submitted prompt>
- Notes: <schema choices, limitations, or API error>
```

---

## Example

**User request:**

> Create a clean editorial illustration of a remote design review for a
> presentation cover, landscape layout, no text.

**Expected behavior:**

1. Refine the prompt and preserve the no-text requirement.
2. Fetch the live Atlas Cloud model catalog.
3. Select a visible image model and fetch its schema.
4. Build a body containing only supported fields.
5. Submit exactly once and retain the request ID.
6. Poll the schema-declared result endpoint with a finite deadline.
7. Download and verify the returned image before reporting success.

---

## Limitations

- Atlas Cloud usage may incur charges according to the selected model.
- Model availability, parameters, and output formats may change.
- Generated images can require human review for text accuracy, brand fit,
  factual details, and content-policy compliance.
- This skill does not bypass provider moderation or usage restrictions.
