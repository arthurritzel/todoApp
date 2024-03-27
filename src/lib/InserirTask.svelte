<script lang="ts">
    import ButtonAddTask from "./ButtonAddTask.svelte";
    export let show: boolean
    import tasks from "../routes/+page.svelte"
   let novaTask: string;
    
    
</script>

{#if show}
    <div class="flex justify-center items-center border border-neutral-350 shadow-sm p-5 rounded-md w-full space-x-5">
        <input bind:value={novaTask} type="text" class="border border-neutral-350 shadow-sm rounded-md w-full">
        <button on:click={()=>{show = false}} class="bg-blue-400 px-3 py-0.5 rounded-md">Add</button>
    </div>
{/if}