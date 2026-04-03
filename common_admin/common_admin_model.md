# Common Admin Model

## Purpose
`common_admin` is the reusable admin capability bundle shared across Hobbeast and Pubapp.
It standardizes operational transparency, provider configuration, integration inventory, release visibility, and admin-side runtime control.

## Mandatory capability blocks
1. Integrations and hosting inventory
2. Application version information
3. Runtime provider controls (where applicable)
4. Local data source operations (where applicable)

## Product rules
- Common admin is an operational capability layer.
- Each app may skin or phrase it differently, but the capability set should remain aligned.
- Do not remove already working app-specific admin paths while adding common_admin.
- Prefer additive rollout with low regression risk.
