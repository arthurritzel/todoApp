<script lang="ts">
    export let show: boolean
</script>

{#if show != true}
    <button class="w-full border-2 border-neutral-300 text-neutral-500 rounded-lg border-dashed  p-3 flex justify-center items-center space-x-2 cursor-pointer" on:click={()=>{show = true}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            
            <p>Add Task</p>
        </button>
{/if}