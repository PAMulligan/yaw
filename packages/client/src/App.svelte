<script lang="ts">
    import Pass from './assets/Pass.svelte';
    import Fail from './assets/Fail.svelte';
    import { stgSubmit, stgCheckStatus } from '../../server/src/index';
    webflow.setExtensionSize('large');
    const stgApiSecret = import.meta.env.VITE_SEO_TAGS_GENERATOR_SECRET;
    let passes = 0;
    let improvements = 0;
    let keyphrase = "";
    let kitDecider = Pass;
    let kimdDecider = Pass;
    let stgJobId = '';

    function searchForKeyphrase(event: SubmitEvent) {
        event.preventDefault();
        passes = 0;
        improvements = 0;
        let contentBoxes = document.getElementsByClassName("invisible");
        Array.from(contentBoxes).forEach(box => {
            box.classList.remove("invisible");
            box.classList.add("visible")
        })
        passes = 0;
        improvements = 0;
        webflow.getCurrentPage().then(value => {
            // Keyphrase in title
            value.getTitle().then(value => {
                const kitParagraph = document.getElementById('keyphrase-in-title-paragraph');
                if (value && value.toLowerCase().includes(keyphrase.toLowerCase())) {
                    kitDecider = Pass;
                    if (kitParagraph) {
                        kitParagraph.innerHTML = 'Congratulations! The title for this page contains your target keyphrase.';
                    }
                    passes++;
                } else {
                    kitDecider = Fail;
                    postStgSubmit(keyphrase)
                    .then(value => {
                        if (value) {
                            console.log(value);
                        }
                    })
                    // .finally(value => {
                    //                 status = value.data.attributes.status.toString();
                    //                 console.log(`Line 83 ${status}`);
                    //                 if (kitParagraph) {
                    //                     kitParagraph.innerHTML = `Try using this for the title: ${value.data.attributes.result.meta_tags.title}`;
                    //                 }
                    //             })

                    //             if (status !== 'success') {
                    //                 retries++;
                    //                 await new Promise(resolve => setTimeout(resolve, 2000));
                    //             }
                    //         } catch (error) {
                    //             console.error("Error checking job status:", error);
                    //             retries++;
                    //             await new Promise(resolve => setTimeout(resolve, 2000));
                    //         }

                    //         if (status === 'success') {
                    //             return 'success';
                    //         } else {
                    //             return 'failed';
                    //         }
                    //     }
                    // }
                    // improvements++;
                }
            })

            // Keyphrase in meta description
            value.getDescription().then(value => {
                const kimdParagraph = document.getElementById('keyphrase-in-meta-description-paragraph');
                if (value && value.toLowerCase().includes(keyphrase.toLowerCase())) {
                    kimdDecider = Pass;                   
                    if (kimdParagraph) {
                        kimdParagraph.innerHTML = 'Great work! The meta description for this page contains your target keyphrase.';
                    }
                    passes++;
                } else {
                    kimdDecider = Fail;
                    if (kimdParagraph) {
                        kimdParagraph.innerHTML = 'Try including your keyphrase in the meta description for this page.';
                    }
                    improvements++;
                }
            })
        })
    }

    async function postStgSubmit(string: string) {
        return await stgSubmit(string);
    }

    async function getStgStatus(string: string) {
        return await stgCheckStatus(string);
    }
</script>
<div id="root">
  <div class="min-h-screen bg-background p-4 md:p-6" style="opacity: 1;">
      <div class="mx-auto w-full max-w-3xl space-y-6">
          <div class="w-full" style="opacity: 1; transform: none;">
              <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full">
                  <div class="flex flex-col space-y-1.5 p-6"><h3 class="text-2xl font-semibold leading-none tracking-tight">SEO Analysis Tool</h3></div>
                  <div class="p-6 pt-0">
                      <form class="space-y-5" on:submit={searchForKeyphrase}>
                          <div class="space-y-2 w-full">
                              <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for=":r1:-form-item">Target keyphrase</label>
                              <div class="w-full" id=":r1:-form-item" aria-describedby=":r1:-form-item-description" aria-invalid="false" style="transform: none;">
                                  <input
                                      class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                                      placeholder="Enter your target keyphrase"
                                      name="keyphrase"
                                      bind:value={keyphrase}
                                  />
                              </div>
                          </div>
                          <div class="w-full pt-2" style="transform: none;">
                              <button
                                  class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 w-full h-11"
                                  type="submit"
                              >
                                  Analyze SEO
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
          <div class="w-full" style="opacity: 1; transform: none;">
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full">
              <div class="flex flex-col space-y-1.5 p-6">
                  <h3 class="text-2xl font-semibold leading-none tracking-tight">Analysis Results</h3>
                  <div class="text-sm text-muted-foreground" style="transform: none;">{passes} passes ✅ • {improvements} improvements needed ❌</div>
              </div>
              <div class="p-6 pt-0">
                  <div dir="ltr" class="relative overflow-hidden h-[600px] pr-4 w-full" style="position: relative; --radix-scroll-area-corner-width: 0px; --radix-scroll-area-corner-height: 0px;">
                      <style>
                          [data-radix-scroll-area-viewport] {
                              scrollbar-width: none;
                              -ms-overflow-style: none;
                              -webkit-overflow-scrolling: touch;
                          }
                          [data-radix-scroll-area-viewport]::-webkit-scrollbar {
                              display: none;
                          }
                          :where([data-radix-scroll-area-viewport]) {
                              display: flex;
                              flex-direction: column;
                              align-items: stretch;
                          }
                          :where([data-radix-scroll-area-content]) {
                              flex-grow: 1;
                          }
                      </style>
                      <div data-radix-scroll-area-viewport="" class="h-full w-full rounded-[inherit]" style="overflow: hidden scroll;">
                          <div data-radix-scroll-area-content="">
                              <div class="invisible border p-4 w-full" style="opacity: 1; transform: none;">
                                  <div class="flex items-start justify-between w-full">
                                      <div class="space-y-2 flex-1">
                                          <div class="font-medium flex items-center gap-2" style="opacity: 1;">
                                              <svelte:component this={kitDecider} />
                                              Keyphrase in Title
                                          </div>
                                          <p id="keyphrase-in-title-paragraph" class="text-sm text-muted-foreground"></p>
                                      </div>
                                  </div>
                              </div>
                              <div class="invisible border p-4 w-full" style="opacity: 1; transform: none;">
                                  <div class="flex items-start justify-between w-full">
                                      <div class="space-y-2 flex-1">
                                          <div class="font-medium flex items-center gap-2" style="opacity: 1;">
                                              <svelte:component this={kimdDecider} />
                                              Keyphrase in Meta Description
                                          </div>
                                          <p id="keyphrase-in-meta-description-paragraph" class="text-sm text-muted-foreground"></p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>        
      </div>
  </div>
  <div role="region" aria-label="Notifications (F8)" tabindex="-1" style="pointer-events: none;">
      <ol tabindex="-1" class="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"></ol>
  </div>
</div>
<style>
  .invisible {
      display: none;
  }
  .visible {
      display: block;
  }
</style>