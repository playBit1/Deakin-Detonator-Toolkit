import React, { useEffect, useState } from "react";
import { Container, Title, Text, Card, Stack, Badge, Collapse, Button, Group, Grid, Divider } from "@mantine/core";
import { BeginnerInformationContent } from "../BeginnerGuideLessonContent/BeginnerGuideLessonContent";
import { IconCheck, IconRocket, IconArrowRight, IconArrowLeft } from "@tabler/icons";

const BGuide1 = () => {
    const guideData = BeginnerInformationContent[0];

    // State to track current page index
    const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

    // State to track which lesson cards are expanded
    const [openSection, setOpenSection] = useState<number | null>(null);

    // Track viewed sections per page
    const [viewedSections, setViewedSections] = useState<boolean[][]>(
        guideData.lessonContent.map((page) => page.pageContent.map(() => false))
    );

    // Track if all sections on current page are viewed
    const [currentPageComplete, setCurrentPageComplete] = useState<boolean>(false);

    // Calculate if all sections on current page have been viewed
    useEffect(() => {
        const allViewed = viewedSections[currentPageIndex]?.every((section) => section === true) || false;
        setCurrentPageComplete(allViewed);
    }, [viewedSections, currentPageIndex]);

    // Toggle function for expanding/collapsing content
    const toggleSection = (sectionIndex: number): void => {
        if (openSection !== sectionIndex) {
            const updatedViewedSections = [...viewedSections];
            updatedViewedSections[currentPageIndex][sectionIndex] = true;
            setViewedSections(updatedViewedSections);
        }

        setOpenSection(openSection === sectionIndex ? null : sectionIndex);
    };

    // Navigation functions
    const goToNextPage = () => {
        if (currentPageIndex < guideData.lessonContent.length - 1) {
            setCurrentPageIndex(currentPageIndex + 1);
            setOpenSection(null); // Reset open section when changing pages
        }
    };

    const goToPreviousPage = () => {
        if (currentPageIndex > 0) {
            setCurrentPageIndex(currentPageIndex - 1);
            setOpenSection(null); // Reset open section when changing pages
        }
    };

    // Current page data
    const currentPageData = guideData.lessonContent[currentPageIndex];
    const isLastPage = currentPageIndex === guideData.lessonContent.length - 1;
    const isFirstPage = currentPageIndex === 0;

    return (
        <Container fluid>
            <Stack spacing="md" p="md">
                <Grid>
                    <Grid.Col span={10}>
                        <Group>
                            <Title order={2}>{guideData.lessonName}</Title>
                            <Badge color="blue" size="sm" variant="filled" style={{ width: "fit-content" }}>
                                {guideData.lessonDifficulty}
                            </Badge>
                            <Badge
                                color={currentPageData.isContentPractical ? "green" : "gray"}
                                size="sm"
                                variant="filled"
                            >
                                {currentPageData.isContentPractical ? "Practical" : "Theory"}
                            </Badge>
                            <Text size="sm" color="dimmed">
                                Page {currentPageIndex + 1} of {guideData.lessonContent.length}
                            </Text>
                        </Group>
                    </Grid.Col>

                    <Grid.Col span={2}>
                        <Group position="right">
                            {!isFirstPage && (
                                <Button leftIcon={<IconArrowLeft />} variant="outline" onClick={goToPreviousPage}>
                                    Previous
                                </Button>
                            )}

                            {!isLastPage && (
                                <Button
                                    rightIcon={<IconArrowRight />}
                                    disabled={!currentPageComplete}
                                    onClick={goToNextPage}
                                    title={
                                        currentPageComplete ? "Continue to next page" : "View all sections to continue"
                                    }
                                >
                                    Next
                                </Button>
                            )}

                            {isLastPage && (
                                <Button
                                    rightIcon={<IconRocket />}
                                    color="green"
                                    disabled={!currentPageComplete}
                                    title={currentPageComplete ? "Complete lesson" : "View all sections to complete"}
                                >
                                    Complete
                                </Button>
                            )}
                        </Group>
                    </Grid.Col>
                </Grid>

                <Text color="dimmed">{guideData.lessonDescription}</Text>

                <Stack spacing="sm">
                    {currentPageData.pageContent.map((section, index) => (
                        <Card key={index} withBorder shadow="sm" radius="md" p="md">
                            <Stack spacing="xs">
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Group spacing="xs">
                                        <Text weight={600}>{section.name}</Text>
                                        {viewedSections[currentPageIndex][index] && (
                                            <IconCheck size={16} color="green" />
                                        )}
                                    </Group>
                                    <Button variant="subtle" compact onClick={() => toggleSection(index)}>
                                        {openSection === index ? "Hide" : "Show"}
                                    </Button>
                                </div>
                                <Collapse in={openSection === index}>
                                    <div>
                                        <Text style={{ whiteSpace: "pre-line", marginTop: "10px" }}>
                                            {section.content}
                                        </Text>

                                        {/* Render attack tool component if available */}
                                        {section.contentAttackToolClass && (
                                            <>
                                                <Divider my="md" />
                                                <div className="tool-component-container">
                                                    {section.contentAttackToolClass}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </Collapse>
                            </Stack>
                        </Card>
                    ))}
                </Stack>

                {!currentPageComplete && (
                    <Text color="dimmed" size="xs" align="center" mt="md">
                        Please view all sections to continue
                    </Text>
                )}
            </Stack>
        </Container>
    );
};

export default BGuide1;
