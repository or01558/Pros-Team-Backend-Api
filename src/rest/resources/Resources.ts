export class UserResources {
    public static resources: Set<string> = new Set<string>().add("dashboard").add("settings").add("developers").add("team");

    public static has(resource: string) {
        return this.resources.has(resource.replace("/", ""));
    }

}

export function isUserResource(resource: string) {
    return UserResources.has(resource);
}
