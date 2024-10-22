import 'dotenv/config'
import { Octokit } from "@octokit/core"


const octokit = new Octokit({
  auth: process.env.GITHUB_API_TOKEN
})

const response = await octokit.request('GET /repos/{owner}/{repo}/forks', {
  owner: 'emilfolino',
  repo: 'pr_tester',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})

const data = response.data;

for (let i = 0; i < data.length; i++) {
    let fork = data[i];

    const pulls = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
        owner: fork.owner.login,
        repo: fork.name,
        state: "open",
        sort: "created",
        direction: "desc",
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    console.log(pulls.data)
}
