import { fetchArchive } from "./fetchService";

export async function getLatestRuntimeSpecVersion(network: string) {
	const response = await fetchArchive<{spec: {specVersion: number}[]}>(
		network, `
			query {
				spec: metadata(orderBy: specVersion_DESC, limit: 1) {
					specVersion
				}
			}
		`
	);

	const latestSpec = response.spec[0];

	if (!latestSpec) {
		throw new Error(`Cannot get latest spec for network '${network}'`);
	}

	return latestSpec.specVersion;
}

export async function getRuntimeSpecVersions(network: string) {
	const response = await fetchArchive<{metadata: {specVersion: number}[]}>(
		network, `
			query {
				metadata(orderBy: specVersion_DESC) {
					specVersion
				}
			}
		`
	);

	return response.metadata.map(it => it.specVersion);
}
