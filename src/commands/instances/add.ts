import { input } from "@inquirer/prompts";
import { Command, Flags, ux } from "@oclif/core";
import Coolify from "../../app/Coolify.js";
import Log from "../../app/Log.js";

export default class InstancesList extends Command {
    static override args = {};

    static override description = "Add a coolify instance";

    static override examples = [];

    static override flags = {
        force: Flags.boolean({
            char: "f",
            description: "Force rewrite the instance",
        }),
        host: Flags.string({
            char: "h",
            description: "Host",
            required: true,
        }),
        name: Flags.string({
            char: "n",
            description: "Name of the instance",
            required: true,
        }),
        token: Flags.string({
            char: "t",
            description: "API Token",
            required: true,
        }),
    };

    public async run(): Promise<void> {
        const { flags } = await this.parse(InstancesList);

        // const url = await input({
        //     message: "Enter your coolify instance URL",
        //     default: "https://app.coolify.io",
        //     required: true,
        // });
        //
        // const password = await input({
        //     message: "Enter your coolify API Token",
        //     required: true,
        // });
        //
        // const name = await input({
        //     message: "Enter a name for this instance",
        //     default: "MyApp",
        //     required: true,
        // });

        const {host, name, token} = (flags!);

        ux.action.start("Logging in to your coolify instance...");

        try {
            await Coolify.addInstance(host, token, name, flags.force);

            Log.success(
                ["Successfully logged in to your coolify instance"],
                true
            );
        } catch (e: any) {
            Log.error(
                [e.message ?? "Failed to login to your coolify instance."],
                true
            );
        }
    }
}
