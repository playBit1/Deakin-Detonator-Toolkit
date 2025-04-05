import {
    Text,
    useMantineTheme,
    Stack,
    Title,
    Table,
    Badge,
    Card,
    Container,
    Button,
    NativeSelect,
} from "@mantine/core";
import { IconStepInto, IconTools, IconSearch, IconTarget, IconRocket } from "@tabler/icons";
import ToolItem from "../components/ToolItem/ToolItem";
import { getBeginnerGuides, getTools } from "../components/RouteWrapper";
import { useState } from "react";

const BPathPage = () => {
    const theme = useMantineTheme();

    const categories = ["All", "Low", "Medium", "High"];

    const [selectedCategory, setSelectedCategory] = useState("");
    const beginnerguides = getBeginnerGuides();

    return (
        <Stack align={"center"}>
            <Title>Beginner Guides</Title>
            <NativeSelect
                value={selectedCategory}
                onChange={(e) => {
                    setSelectedCategory(e.target.value);
                }}
                title="Filter Difficulty"
                data={categories}
                required
                placeholder="Filter Difficulty"
            />
            <Table horizontalSpacing="xl" verticalSpacing="md" fontSize="md">
                <thead>
                    <tr>
                        <th>Guide Name</th>
                        <th>Guide Description</th>
                        <th>Guide Difficulty</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {beginnerguides.map((beginnerguide) => {
                        // Check if the selected category matches the tool's category
                        if (
                            !selectedCategory ||
                            selectedCategory === "All" ||
                            beginnerguide.category === selectedCategory
                        ) {
                            return (
                                <ToolItem
                                    title={beginnerguide.name}
                                    description={beginnerguide.description}
                                    route={beginnerguide.path}
                                    category={beginnerguide.category}
                                    key={beginnerguide.name}
                                />
                            );
                        }
                        return null; // Skip rendering if the category doesn't match
                    })}
                </tbody>
            </Table>
        </Stack>
    );
};
/*
<Container fluid>
            <Stack spacing="md" p="md">
                <Card withBorder shadow="sm" radius="md" p="md">
                    <Title order={4}>Deakin Detonator Tool</Title>
                    <Text>
                        DDT: Hello there! Welcome to the world of Ethical Hacking! My name is DDT! People call me the
                        DDT PROFESSIONAL. This world is inhabited by technical professionals called Hackers! For some
                        people, Hacking is fun. Others use them for financial gain. Myself...I study hacking as a
                        profession.
                    </Text>
                </Card>

                <div>
                    <Title order={3}>Available Lessons</Title>
                    <Card withBorder shadow="sm" radius="md" p="md">
                        <Stack spacing="sm">
                            {lessons.map((lesson, index) => (
                                <Card key={index} withBorder shadow="sm" radius="md" p="md">
                                    <Stack spacing="xs">
                                        <div>
                                            <Text weight={600}>{lesson.name}</Text>
                                            <Badge
                                                color={
                                                    lesson.difficulty === "Low"
                                                        ? "green"
                                                        : lesson.difficulty === "Medium"
                                                        ? "orange"
                                                        : "red"
                                                }
                                            >
                                                Difficulty: {lesson.difficulty}
                                            </Badge>
                                        </div>
                                        
                                    </Stack>
                                </Card>
                            ))}
                        </Stack>
                    </Card>
                </div>
            </Stack>
        </Container>

        */

export default BPathPage;
